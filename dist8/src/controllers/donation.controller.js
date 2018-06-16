"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const donation_repository_1 = require("../repositories/donation.repository");
const rest_1 = require("@loopback/rest");
const user_donation_1 = require("../models/user_donation");
const charity_repository_1 = require("../repositories/charity.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
let DonationsController = class DonationsController {
    constructor(donationRepo, charityRepo) {
        this.donationRepo = donationRepo;
        this.charityRepo = charityRepo;
    }
    async allDonationForUser(UserToFind) {
        return await this.donationRepo.find({ where: { user_id: UserToFind } });
    }
    async charitiesDonatedTo(jwt) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'shh');
            let allDonations = await this.donationRepo.find({ where: { user_id: jwtBody.user.id } });
            let charityIdArray = [];
            for (var i = 0; i < allDonations.length; ++i) {
                charityIdArray.push(allDonations[i].charity_id);
            }
            var charitiesDonatedToList = await this.charityRepo.find({
                where: {
                    id: { inq: charityIdArray }
                }
            });
            return charitiesDonatedToList;
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
    }
    async getAllDonation() {
        return await this.donationRepo.find();
    }
    async addDonation(user_Id, charity_Id, donation_amount) {
        var donation = new user_donation_1.User_Donation;
        donation.DonationSum = donation_amount;
        donation.user_id = user_Id;
        donation.charity_id = charity_Id;
        return await this.donationRepo.create(donation);
    }
};
__decorate([
    rest_1.get('/donation/{user_id}'),
    __param(0, rest_1.param.path.number('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "allDonationForUser", null);
__decorate([
    rest_1.get('/donation1/charitiesDonatedTo'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "charitiesDonatedTo", null);
__decorate([
    rest_1.get('/donation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "getAllDonation", null);
__decorate([
    rest_1.post('/user/{user_Id}/charity/{charity_Id}/donation'),
    __param(0, rest_1.param.path.number('user_Id')),
    __param(1, rest_1.param.path.number('charity_Id')),
    __param(2, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "addDonation", null);
DonationsController = __decorate([
    __param(0, repository_1.repository(donation_repository_1.DonationRepository.name)),
    __param(1, repository_1.repository(charity_repository_1.CharityRepository.name)),
    __metadata("design:paramtypes", [user_donation_1.User_Donation,
        charity_repository_1.CharityRepository])
], DonationsController);
exports.DonationsController = DonationsController;
//# sourceMappingURL=donation.controller.js.map